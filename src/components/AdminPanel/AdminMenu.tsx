import React from "react";
import { Panel } from "../../types";
import { Button } from "@material-ui/core";
import clsx from "clsx";

type AdminMenuProps = {
    show: boolean;
    selected: boolean;
    setShowFab: React.Dispatch<React.SetStateAction<boolean>>;
    style: any;
    activeSubmenuItem: any;
    setActiveSubmenuItem: any;
    setActivePanel: any;
};
const AdminMenu = ({
    show,
    selected,
    setShowFab,
    style,
    activeSubmenuItem,
    setActiveSubmenuItem,
    setActivePanel,
}: AdminMenuProps) => {
    if (!show) return null;

    const items = [
        {
            text: "Rediger gruppeledere",
        },
        {
            text: "Rediger grupper",
        },
        {
            text: "Rediger administratorer",
        },
        {
            text: "Rediger katalog",
        },
    ];

    return (
        <>
            <Button
                className={clsx(style.MenuButton, {
                    [style.menuButtonActive]: selected,
                })}
                onClick={() => {
                    // main pane is same as edit group leader pane atm
                    setShowFab(false);
                    setActiveSubmenuItem("Rediger gruppeledere");
                    setActivePanel(Panel.Admin);
                }}
            >
                <div className={clsx(style.menuButtonText)}>ADMIN</div>
            </Button>

            {selected &&
                items.map((cat) => (
                    <Button
                        key={cat.text}
                        className={clsx(style.MenuButton, {
                            [style.menuButtonActive]:
                                activeSubmenuItem === cat.text,
                        })}
                        onClick={() => setActiveSubmenuItem(cat.text)}
                    >
                        <span
                            className={clsx(
                                style.menuButtonText,
                                style.menuButtonCategoryText
                            )}
                        >
                            {cat.text}
                        </span>
                    </Button>
                ))}
        </>
    );
};

export { AdminMenu };
