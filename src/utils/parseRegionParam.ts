import { z } from "zod";

export const regionParamSchema = z.union([
    z.literal("br"),
    z.literal("eun"),
    z.literal("euw"),
    z.literal("jp"),
    z.literal("kr"),
    z.literal("lan"),
    z.literal("las"),
    z.literal("na"),
    z.literal("oce"),
    z.literal("ph"),
]);
