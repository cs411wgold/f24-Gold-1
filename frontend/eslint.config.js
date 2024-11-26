import jsdocPlugin from "eslint-plugin-jsdoc";

export default [
    {
        plugins: {
            jsdoc: jsdocPlugin 
        },
        rules: {
            "jsdoc/require-jsdoc": [
                "warn",
                {
                    require: {
                        FunctionDeclaration: true,
                        MethodDefinition: true,
                        ClassDeclaration: true,
                        ArrowFunctionExpression: true,
                        FunctionExpression: false
                    }
                }
            ]
        }
    }
];
