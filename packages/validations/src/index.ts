import { z } from "zod";

/** Ported from ApiServlet.java validation: Civil ID ^\d{12}$, Kuwait mobile, IEI-KW-N */
export const civilId = z.string().regex(/^\d{12}$/, "Civil ID must be 12 digits");
export const kwMobile = z.string().regex(/^\d{8}$/, "Mobile must be 8 digits");
export const memberId = z.string().regex(/^IEI-KW-\d+$/, "Bad Member ID");

export const applicationSchema = z.object({
  name: z.string().min(2).max(120),
  civilId,
  mobile: kwMobile,
  email: z.string().email().max(120),
  discipline: z.string().min(2).max(80),
  grade: z.string().min(2).max(40),
});

export const renewalSchema = z.object({
  memberId,
  mobile: kwMobile,
  method: z.enum(["bank", "cash"]),
});

export const rsvpSchema = z.object({
  eventId: z.string().min(2).max(40),
  name: z.string().min(2).max(120),
  mobile: kwMobile,
  seats: z.number().int().min(1).max(10),
});

export const jobSchema = z.object({
  title: z.string().min(3).max(140),
  company: z.string().min(2).max(140),
  description: z.string().min(20).max(8000),
  email: z.string().email(),
});
