import { Contact, Lane, Prisma, Tag, Ticket, User } from "@prisma/client";
import { z } from "zod";
import { getFunnels } from "./querys";

export type FunnelsForSubAccount = Prisma.PromiseReturnType<typeof getFunnels>[0];
export type UpsertFunnelPage = Prisma.FunnelPageCreateWithoutFunnelInput;
