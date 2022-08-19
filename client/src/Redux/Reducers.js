const inicialState = {
  recipesDetail: [],
  recipes: [],
  AllRecipes: [],
  diets: [],
};

const rootReducer = (state = inicialState, action) => {
  switch (action.type) {
    case "GET_ALL_RECIPES":
      return {
        ...state,
        recipes: action.payload,
        AllRecipes: action.payload,
      };

    case "GET_RECIPES":
      return {
        ...state,
        recipes: action.payload,
      };

    case "GET_RECIPE_DETAIL":
      return {
        ...state,
        recipesDetail: action.payload,
      };

    case "GET_DIETS":
      return {
        ...state,
        diets: action.payload,
      };

    case "CREATE_RECIPE":
      return {
        ...state,
      };

    case "ORDER_A_Z":
      let order =
        action.payload === "asc"
          ? state.recipes.sort((a, b) => {
              if (a.title.toLowerCase() > b.title.toLowerCase()) return 1;
              if (b.title.toLowerCase() > a.title.toLowerCase()) return -1;
              return 0;
            })
          : state.recipes.sort((a, b) => {
              if (a.title.toLowerCase() > b.title.toLowerCase()) return -1;
              if (b.title.toLowerCase() > a.title.toLowerCase()) return 1;
              return 0;
            });

      return {
        ...state,
        recipes: [...order],
      };

    case "ORDER_SCORE":
      let scoring =
        action.payload === "min"
          ? state.recipes.sort((a, b) => {
              if (a.healthscore > b.healthscore) return 1;
              if (b.healthscore > a.healthscore) return -1;
              return 0;
            })
          : state.recipes.sort((a, b) => {
              if (a.healthscore > b.healthscore) return -1;
              if (b.healthscore > a.healthscore) return 1;
              return 0;
            });

      return {
        ...state,
        recipes: [...scoring],
      };

    case "FILTER_DIET":
      const allRecipes = state.AllRecipes;
      const filtrado =
        action.payload === "AllDiets"
          ? allRecipes
          : allRecipes.filter((A) =>
              A.Tipos
                ? A.Tipos[0].diets.includes(action.payload)
                : A.diets?.includes(action.payload)
            );

      return {
        ...state,
        recipes: filtrado,
      };

    default:
      return state;
  }
};

export default rootReducer;
