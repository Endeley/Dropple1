const COLORS = ['#FF4D4F', '#1890FF', '#52C41A', '#FAAD14', '#722ED1', '#EB2F96'];

export const getCursorColor = (id) => {
    let hash = 0;
    for (let i = 0; i < id.length; i++) hash += id.charCodeAt(i);
    return COLORS[hash % COLORS.length];
};
