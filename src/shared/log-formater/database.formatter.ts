export function formatSequelizeError(err: Error | any) {
  const name = err?.name;
  switch (name) {
    case 'SequelizeDatabaseError':
    case 'SequelizeForeignKeyConstraintError':
      if (err?.parent) {
        err.parent = err.parent.toString();
      }
      if (err?.original) {
        err.original = err.original.toString();
      }
      return err;

    default:
      return err;
  }

  // err.parrentMessage = err.parent?.toString();
  // err.originalMessage = err.original?.toString();
  // return err;
}
