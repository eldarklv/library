export interface IBook {
  title: string,

  description: string,

  authors: string,

  favorite?: string | null | undefined,

  fileCover?: string | null | undefined,

  fileName?: string | null | undefined,

  fileBook?: string | null | undefined
}