export const refreshLogin = async () => {
  const refreshResponse = await fetch("/api/users/refresh", {
    method: "GET",
  });
  const data = await refreshResponse.json();
  if (!refreshResponse.ok) {
    return false;
  } else {
    sessionStorage.setItem("accessToken", data.accessToken);
  }
  return true;
};

export const verifyLogin = async () => {
  const response = await fetch("/api/users/verify", {
    method: "GET",
    headers: {
      authorization: `Bearer ${sessionStorage.getItem("accessToken")}`,
    },
  });
  if (!response.ok) {
    return false;
  }
  return true;
};
