const API_URL = import.meta.env.VITE_API_URL;

type RequestOptions = Omit<RequestInit, 'body'> & { body?: unknown };

const buildHeaders = (options: RequestOptions): HeadersInit => ({
    'Content-Type': 'application/json',
    ...(options.headers instanceof Headers
      ? Object.fromEntries(options.headers)
      : Array.isArray(options.headers)
        ? Object.fromEntries(options.headers)
        : (options.headers ?? {})),
  });

const buildRequest = (options: RequestOptions): RequestInit => {
  const { headers: _, body: __, ...rest } = options; // extract to avoid spread conflict
  const init: RequestInit = {
    ...rest,
    headers: buildHeaders(options),
  };

  if (options.body !== undefined && !(options.body instanceof FormData)) {
    init.body = typeof options.body === 'string' ? options.body : JSON.stringify(options.body);
  }

  return init;
};

const requestJSON = async <T = unknown>(endpoint: string, options: RequestOptions = {}): Promise<T> => {
  if (!API_URL) {
    throw new Error('No API URL provided');
  }

  const response = await fetch(`${API_URL}${endpoint}`, buildRequest(options));
  if (!response.ok) {
    const errorText = await response.text().catch(() => '');
    throw new Error(`Error while fetching ${endpoint}${errorText ? `: ${errorText}` : ''}`);
  }

  return (await response.json()) as T;
};

export const getJSON = async <T = unknown>(endpoint: string): Promise<T> => requestJSON<T>(endpoint);

export const postJSON = async <T = unknown>(endpoint: string, body?: unknown): Promise<T> =>
  requestJSON<T>(endpoint, {
    method: 'POST',
    body,
  });

export const putJSON = async <T = unknown>(endpoint: string, body?: unknown): Promise<T> =>
  requestJSON<T>(endpoint, {
    method: 'PUT',
    body,
  });

export const patchJSON = async <T = unknown>(endpoint: string, body?: unknown): Promise<T> =>
  requestJSON<T>(endpoint, {
    method: 'PATCH',
    body,
  });

export const deleteJSON = async <T = unknown>(endpoint: string, body?: unknown): Promise<T> =>
  requestJSON<T>(endpoint, {
    method: 'DELETE',
    body,
  });