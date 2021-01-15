interface apiProps {
  baseUrl: string;
}

export const api: apiProps = {
  baseUrl: process.env.REACT_APP_API_BASE_URL || "",
};
