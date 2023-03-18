import React, { useEffect } from "react"
import { useMediaQuery, Stack, ListItemButton, Divider, ListItemText, Drawer } from "@mui/material"
import { Link } from "react-router-dom"

const ProfileSidebar = ({ open, setOpen }) => {
  const isSmall = useMediaQuery((theme) => theme.breakpoints.only("xs"))

  useEffect(() => {
    if (!isSmall && open) setOpen(false)
  }, [isSmall])

  return (
    <Drawer
      anchor="left"
      variant={isSmall ? "temporary" : "permanent"}
      open={open}
      onClose={() => setOpen(false)}
      PaperProps={{
        sx: {
          bgcolor: "#000",
          position: "static",
          p: "24px",
          width: { xs: "220px", sm: "180px", md: "220px" },
          height: "full"
        },
      }}
    >
      <Stack divider={<Divider orientation="horizontal" flexItem sx={{ bgcolor: "red" }} />}>
        {[
          { label: "Details", link: "/profile" },
          { label: "Password", link: "/profile/password" },
          { label: "Something", link: "/profile" },
          { label: "Something else", link: "/profile" },
          { label: "Something more else", link: "/profile" },
        ].map(({ label, link }, idx) => (
          <Link key={idx} to={link} onClick={() => open && setOpen(false)}>
            <ListItemButton>
              <ListItemText primary={label} />
            </ListItemButton>
          </Link>
        ))}
      </Stack>
    </Drawer>
  )
}

export default ProfileSidebar
