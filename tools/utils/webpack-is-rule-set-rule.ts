import type { RuleSetRule } from "webpack";

export const isRuleSetRule = (
  rule: RuleSetRule | "..." | undefined | null | false | 0 | "" // this is webpack's module.rules type
): rule is RuleSetRule => {
  if (typeof rule !== "object") return false;

  return !!rule?.test;
};
