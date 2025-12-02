// UI interaction scaffolds
export const uiInteractions = {
  click(target, payload) {
    target?.onClick?.(payload);
  },
  hover(target, payload) {
    target?.onHover?.(payload);
  },
  submit(target, payload) {
    target?.onSubmit?.(payload);
  },
};
