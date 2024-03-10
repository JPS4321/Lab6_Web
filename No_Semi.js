module.exports = {
    meta: {
        type: "suggestion",
        docs: {
        description: "disallow semicolons",
        category: "Stylistic Issues",
        recommended: false,
      },
      fixable: "code",
      schema: [], 
    },
    create: function (context) {
      return {
        'ExpressionStatement, VariableDeclaration, ReturnStatement'(node) {
          const sourceCode = context.getSourceCode();
          const semicolonToken = sourceCode.getLastToken(node);
  
          if (semicolonToken.value === ';') {
            context.report({
              node,
              message: "Unexpected semicolon.",
              fix(fixer) {
                return fixer.remove(semicolonToken);
              }
            });
          }
        },
      };
    }
  };
  