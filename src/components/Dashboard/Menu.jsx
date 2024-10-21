import { ListActionTypes } from "@mui/base/useList";
import JoyMenu from "@mui/joy/Menu";
import MenuItem from "@mui/joy/MenuItem";
import * as React from "react";

export default function Menu(props) {
  const { control, menus, id } = props;
  const [buttonElement, setButtonElement] = React.useState(null);
  const [isOpen, setOpen] = React.useState(false);
  const buttonRef = React.useRef(null);
  const menuActions = React.useRef(null);
  const preventReopen = React.useRef(false);

  const updateAnchor = React.useCallback((node) => {
    setButtonElement(node);
  }, []);

  const handleButtonClick = (event) => {
    if (preventReopen.current) {
      event.preventDefault();
      preventReopen.current = false;
      return;
    }

    setOpen((open) => !open);
  };

  const handleButtonKeyDown = (event) => {
    if (event.key === "ArrowDown" || event.key === "ArrowUp") {
      event.preventDefault();
      setOpen(true);
      if (event.key === "ArrowUp") {
        menuActions.current?.dispatch({
          type: ListActionTypes.keyDown,
          key: event.key,
          event,
        });
      }
    }
  };

  const close = () => {
    setOpen(false);
  };

  return (
    <React.Fragment>
      {React.cloneElement(control, {
        type: "button",
        onClick: handleButtonClick,
        onKeyDown: handleButtonKeyDown,
        ref: updateAnchor,
        "aria-controls": isOpen ? id : undefined,
        "aria-expanded": isOpen || undefined,
        "aria-haspopup": "menu",
      })}
      <JoyMenu
        id={id}
        placement="bottom-end"
        actions={menuActions}
        open={isOpen}
        onClose={close}
        anchorEl={buttonElement}
        sx={{ minWidth: 120 }}
      >
        {menus.map(({ label, active, ...item }) => {
          const menuItem = (
            <MenuItem
              selected={active}
              variant={active ? "soft" : "plain"}
              onClick={close}
              {...item}
            >
              {label}
            </MenuItem>
          );
          if (item.href) {
            return (
              <li key={label} role="none">
                {React.cloneElement(menuItem, { component: "a" })}
              </li>
            );
          }
          return React.cloneElement(menuItem, { key: label });
        })}
      </JoyMenu>
    </React.Fragment>
  );
}