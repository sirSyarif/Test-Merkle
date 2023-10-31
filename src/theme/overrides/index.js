import { merge } from "lodash";
import Input from "./Input";
import Button from "./Button";
import Typography from "./Typography";
import IconButton from "./IconButton";

// ----------------------------------------------------------------------

export default function ComponentsOverrides(theme) {
  return merge(
    Input(theme),
    Button(theme),
    Typography(theme),
    IconButton(theme)
  );
}
