interface ParameterString {
    type: 'string';
    description: string;
}
interface ParameterArray {
    type: 'array';
    description: string;
    items: {
        type: 'string';
    };
}
interface ParameterEnum extends ParameterString {
    enum: string[];
}
type ToolParameter = ParameterString | ParameterEnum | ParameterArray;

export type ToolDeclaration = {
    type: 'function';
    function: {
        name: string;
        description: string;
        parameters: {
            type: 'object';
            properties: ToolParameter;
            required: string[];
        };
    };
};
