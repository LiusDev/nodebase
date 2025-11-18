/**
 * Utility types for working with Prisma models
 */

/**
 * Converts Date fields to string for serialized data (e.g., from API responses)
 * This is useful when Prisma types are sent over the network via tRPC or API routes
 */
export type SerializedDates<T> = {
	[K in keyof T]: T[K] extends Date
		? string
		: T[K] extends Date | null
		? string | null
		: T[K] extends Date | undefined
		? string | undefined
		: T[K] extends object
		? SerializedDates<T[K]>
		: T[K]
}

/**
 * Makes createdAt and updatedAt fields optional
 * Useful for create operations where these fields are auto-generated
 */
export type WithoutTimestamps<T> = Omit<T, "createdAt" | "updatedAt">

/**
 * Makes createdAt and updatedAt fields optional (if they exist)
 * Useful for input types where timestamps may or may not be provided
 */
export type OptionalTimestamps<T> = {
	[K in keyof T as K extends "createdAt" | "updatedAt" ? never : K]: T[K]
} & {
	[K in keyof T as K extends "createdAt" | "updatedAt" ? K : never]?: T[K]
}

/**
 * Combines SerializedDates with OptionalTimestamps
 * Perfect for client-side data where dates are strings and timestamps are optional
 */
export type ClientData<T> = SerializedDates<OptionalTimestamps<T>>

/**
 * For partial updates where all fields including timestamps are optional
 */
export type UpdateData<T> = Partial<SerializedDates<T>>

/**
 * For create operations - excludes auto-generated fields and serializes dates
 */
export type CreateData<T> = SerializedDates<
	Omit<T, "id" | "createdAt" | "updatedAt">
>
