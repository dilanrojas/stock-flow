// Este tipo representa el estado del modal,
// se utiliza en el contexto de UI para determinar
// cuál modal mostrar.
//
// Agregar nuevos tipos cuando sea necesario.
//
// Por ejemplo, para el editado de un producto u otro
// objeto, se debe proporcionar el ID (resourceId).
//
// De esta forma: { type: 'EDIT_PRODUCT', resourceId: string }
//
// Esto indicaría que, si el type === 'EDIT_PRODUCT', se debe
// pasar por props el resourceId para indicar qué product se está editando.

export type ModalState = { type: 'NONE' } | { type: 'ADD_MOVEMENT' } | { type: 'ADD_PURCHASE' };
