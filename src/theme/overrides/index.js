import { merge } from "lodash";
import Input from "./Input";
import Button from "./Button";
import Typography from "./Typography";
import IconButton from "./IconButton";
import Paper from "./Paper";

export default function ComponentsOverrides(theme) {
  return merge(
    Input(theme),
    Button(theme),
    Typography(theme),
    IconButton(theme),
    Paper(theme)
  );
}
