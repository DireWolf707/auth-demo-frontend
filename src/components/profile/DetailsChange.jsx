import React, { useRef, useState } from "react"
import { Stack, Box, TextField, Button, IconButton } from "@mui/material"
import {
  useProfileQuery,
  useChangeDetailsMutation,
  useUpdateProfilePicMutation,
  useRemoveProfilePicMutation,
  useAddProfilePicMutation,
} from "../../../store"
import { useBackendErrorHandler } from "../../hooks/useBackendErrorHandler"
import AddAPhotoIcon from "@mui/icons-material/AddAPhoto"
import DeleteIcon from "@mui/icons-material/Delete"
import { useSnackbar } from "notistack"
import { toastOptions } from "../../utils/toastOptions"

const DetailsChange = () => {
  const { enqueueSnackbar: toast } = useSnackbar()
  const { data: userData } = useProfileQuery()
  const profilePicture = userData.user.profilePicture
  const [changeDetails, { isLoading }] = useChangeDetailsMutation()
  const [addProfilePic, { isLoading: isProfilePicAdding }] = useAddProfilePicMutation()
  const [updateProfilePic, { isLoading: isProfilePicUpdating }] = useUpdateProfilePicMutation()
  const [removeProfilePic, { isLoading: isProfilePicRemoving }] = useRemoveProfilePicMutation()

  const nameRef = useRef(null)
  const [formErrors, setFormErrors] = useState({})
  const { errorHandler } = useBackendErrorHandler(setFormErrors)

  const handleSubmit = (e) => {
    e.preventDefault()
    const name = nameRef.current.value

    changeDetails({ userId: userData.user.id, name })
      .unwrap()
      .then(() => toast("Details updated successfully!", toastOptions("success")))
      .catch(errorHandler)
  }

  const handleProfilePic = (e) => {
    const file = e.target.files[0]
    const ProfilePicData = new FormData()
    ProfilePicData.append("file", file)

    if (profilePicture)
      updateProfilePic({ profilePicId: profilePicture.id, ProfilePicData })
        .unwrap()
        .then(() => toast("Profile picture updated successfully!", toastOptions("success")))
        .catch(errorHandler)
    else
      addProfilePic({ ProfilePicData })
        .unwrap()
        .then(() => toast("Profile picture added successfully!", toastOptions("success")))
        .catch(errorHandler)
  }

  const handleRemoveProfilePic = () => {
    removeProfilePic({ profilePicId: profilePicture.id })
      .unwrap()
      .then(() => toast("Profile picture removed successfully!", toastOptions("success")))
      .catch(errorHandler)
  }

  return (
    <Stack
      component="form"
      alignItems="center"
      onSubmit={handleSubmit}
      gap={1.2}
      sx={{ borderRadius: "4px", m: "auto", p: "24px", bgcolor: "white", width: "320px" }}
    >
      <Box sx={{ position: "relative", marginTop: "-106px" }}>
        <input
          onChange={handleProfilePic}
          disabled={isProfilePicUpdating || isProfilePicAdding}
          type="file"
          id="imgUpload"
          style={{ display: "none" }}
        />
        <label htmlFor="imgUpload">
          <Box
            sx={{
              height: "180px",
              width: "160px",
              bgcolor: "black",
              borderRadius: "100%",
              position: "absolute",
              opacity: 0,
              ":hover": { opacity: 0.5 },
              cursor: "pointer",
            }}
          >
            <AddAPhotoIcon sx={{ position: "absolute", top: "50%", left: "50%", translate: "-50% -50%", fill: "red" }} />
          </Box>
        </label>

        <Box
          component="img"
          src={profilePicture?.sizes.large.url || "/blank.png"}
          sx={{ height: "180px", width: "160px", borderRadius: "100%", objectFit: "cover" }}
        />

        {profilePicture && (
          <IconButton onClick={handleRemoveProfilePic} disabled={isProfilePicRemoving} sx={{ position: "absolute", bottom: "25%" }}>
            <DeleteIcon sx={{ fill: "red" }} />
          </IconButton>
        )}
      </Box>

      <TextField
        label="Email"
        variant="outlined"
        size="small"
        color="error"
        fullWidth
        type="email"
        defaultValue={userData.user.email}
        disabled={true}
      />

      {[{ label: "Name", errField: "name", ref: nameRef, type: "text", required: true, initialValue: userData.user.name }].map(
        ({ label, errField, ref, type, required, initialValue, disabled }, idx) => (
          <TextField
            key={idx}
            inputProps={{ ref }}
            label={label}
            variant="outlined"
            size="small"
            color="error"
            fullWidth
            required={required}
            type={type}
            error={Boolean(formErrors[errField])}
            helperText={formErrors[errField]}
            defaultValue={initialValue}
            disabled={disabled}
          />
        )
      )}

      <Button type="submit" variant="contained" color="error" fullWidth disabled={isLoading}>
        Update Details
      </Button>
    </Stack>
  )
}

export default DetailsChange
