// Normalize a port into a number, string, or false.
function normalizePort(val: string | number): number | string | false {
  const port = parseInt(val as string, 10);

  if (isNaN(port)) {
    // named pipe
    return val;
  }

  if (port >= 0) {
    // port number
    return port;
  }


  return false;
}

export { normalizePort };
