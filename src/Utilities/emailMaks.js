export const maskEmail = (email) => {
  if (!email) return "";

  const [name, domain] = email.split("@");
  const domainParts = domain.split(".");

  const maskedName = name.slice(0, 3) + ".**";

  const maskedDomain = "**" + domainParts[domainParts.length - 1];

  return `${maskedName}@${maskedDomain}`;
};
