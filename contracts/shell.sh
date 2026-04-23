onw() {
  local output
  output=$(command onw "$@")
  
  if [[ $output == __jump__:* ]]; then
    local target="${output#__jump__:}"
    cd "$target" || return 1
  else
    echo "$output"
  fi
}
