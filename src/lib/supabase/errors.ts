/**
 * Gestion des erreurs Supabase
 */

export class SupabaseError extends Error {
  constructor(
    message: string,
    public readonly code?: string,
    public readonly details?: unknown
  ) {
    super(message);
    this.name = "SupabaseError";
    Object.setPrototypeOf(this, SupabaseError.prototype);
  }
}

export class SupabaseConfigError extends SupabaseError {
  constructor(message: string) {
    super(message);
    this.name = "SupabaseConfigError";
  }
}

export class SupabaseQueryError extends SupabaseError {
  constructor(
    message: string,
    code?: string,
    details?: unknown
  ) {
    super(message, code, details);
    this.name = "SupabaseQueryError";
  }
}

export function handleSupabaseError(error: unknown): SupabaseError {
  if (error instanceof SupabaseError) {
    return error;
  }
  if (error instanceof Error) {
    return new SupabaseQueryError(error.message, undefined, error);
  }
  return new SupabaseQueryError(
    typeof error === "string" ? error : "Erreur Supabase inconnue",
    undefined,
    error
  );
}

export type Result<T, E = SupabaseError> =
  | { data: T; error: null }
  | { data: null; error: E };

export function toResult<T>(response: {
  data: T | null;
  error: { message: string; code?: string; details?: unknown } | null;
}): Result<T> {
  if (response.error) {
    return {
      data: null,
      error: new SupabaseQueryError(
        response.error.message,
        response.error.code,
        response.error.details
      ),
    };
  }
  return { data: response.data as T, error: null };
}
