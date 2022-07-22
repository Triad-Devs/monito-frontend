import Link from "@mui/material/Link";

const Anchor = ({ url }) => {
  return (
    <Link
      sx={{
        "&:hover": {
          background: "#fff",
          color: "#000",
        },
        color: "#fff",
      }}
      href={url}
    >
      {url}
    </Link>
  );
};

export default Anchor;
