// Condition evaluator stub.
export const evaluateCondition = (condition, context = {}) => {
  if (typeof condition === "function") return !!condition(context);
  if (typeof condition === "boolean") return condition;
  return false;
};
