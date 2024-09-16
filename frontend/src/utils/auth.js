
export function getTokenDuration() {
  const storedExpirationDate = localStorage.getItem("expiration");
  const expirationDate = new Date(storedExpirationDate);
  const now = new Date();
  const duration = expirationDate.getTime() - now.getTime();
  return duration;
}

export function getAuthToken() {
  const token = localStorage.getItem("token");
  if (!token) {
    return null;
  }

  const tokenDuration = getTokenDuration();

  if (tokenDuration < 0) {
    return "EXPIRED";
  }

  return token;
}
export function getUserRole() {
  const role = localStorage.getItem("role");
  return role;
 
}


export function hasRole(role) {
  return getUserRole() === role;
}

export function tokenLoader() {
    return getAuthToken();
}
export function checkAuthLoader() {
  const token = getAuthToken();

  if (!token) {
      return redirect('/auth');
  }

  return null; // 
}


