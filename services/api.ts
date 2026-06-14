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

const requestJSON = async <T = unknown>(
  endpoint: string,
  options: RequestOptions = {},
): Promise<T> => {
  if (!API_URL) {
    throw new Error('No API URL provided');
  }

  const response = await fetch(`${API_URL}${endpoint}`, buildRequest(options));
  if (!response.ok) {
    const contentType = response.headers.get('content-type') ?? '';
    let errorBody = '';

    if (contentType.includes('application/json')) {
      try {
        const json = await response.json();
        errorBody = JSON.stringify(json);
      } catch {
        errorBody = await response.text().catch(() => '');
      }
    } else {
      errorBody = await response.text().catch(() => '');
    }

    throw new Error(
      `Error while fetching ${endpoint} (status ${response.status}${response.statusText ? ` ${response.statusText}` : ''})${errorBody ? `: ${errorBody}` : ''
      }`,
    );
  }

  if (response.status === 204) {
    return undefined as T;
  }

  const text = await response.text();
  return text ? (JSON.parse(text) as T) : (undefined as T);
};

export const getJSON = async <T = unknown>(endpoint: string): Promise<T> =>
  requestJSON<T>(endpoint);

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
