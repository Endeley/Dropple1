// Lightweight variable text stand-in (no fabric dependency).
export class VariableText {
    static type = 'variable-text';

    constructor(text = '', options = {}) {
        this.type = VariableText.type;
        this.text = text;
        this.opentypeFeatures = options.opentypeFeatures || {};
        this.variableAxes = options.variableAxes || {};
        this.charSpacing = options.charSpacing ?? 0;
        this.lineHeight = options.lineHeight ?? 1.2;
    }

    _setVariableAxis(axis, value) {
        this.variableAxes = this.variableAxes || {};
        this.variableAxes[axis] = value;
    }

    toObject(propertiesToInclude = []) {
        const extra = Array.isArray(propertiesToInclude) ? propertiesToInclude : [];
        const base = {
            type: this.type,
            text: this.text,
            opentypeFeatures: this.opentypeFeatures,
            variableAxes: this.variableAxes,
            charSpacing: this.charSpacing,
            lineHeight: this.lineHeight,
        };
        extra.forEach((key) => {
            if (this[key] !== undefined) base[key] = this[key];
        });
        return base;
    }
}
