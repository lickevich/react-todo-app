const getRandomInt = () => {
  const min = Math.ceil(100_000_000);
  const max = Math.floor(999_999_999);

  return Math.floor(Math.random() * (max - min + 1)) + min;
};

const createTodoItem = (label) => {
  const id = getRandomInt();

  return {
    id,
    label,
    important: false,
    done: false,
  };
};

export { createTodoItem };
