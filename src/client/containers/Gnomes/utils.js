const getProfessions = array => {
  if (array == undefined) return undefined;
  const result = [];
  const map = new Map();
  for (const item of array) {
    item.professions.map(prof => {
      if (!map.has(prof)) {
        map.set(prof, true);
        result.push({
          name: prof,
        });
      }
    });
  }
  return result;
};

const getHairColors = array => {
  if (array == undefined) return undefined;
  const result = [];
  const map = new Map();
  for (const item of array) {
    const { hair_color } = item;
    if (!map.has(item.hair_color)) {
      map.set(hair_color, true);
      result.push({
        name: hair_color,
      });
    }
  }
  return result;
};

export { getProfessions, getHairColors };
