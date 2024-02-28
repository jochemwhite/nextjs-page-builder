"use client"

import { z } from "zod"

const buttonSchema = z.object({
  link: z.string().url(),
  openNewTab: z.boolean(),
  showIcon: z.boolean(),
  icon: z.string().optional()
})



//create type from schema
export type ButtonSchema = z.infer<typeof buttonSchema>
export default buttonSchema