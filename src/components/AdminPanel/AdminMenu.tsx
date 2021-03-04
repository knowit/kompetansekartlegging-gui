import React from "react";
import { Panel } from "../../types";
import { Button } from "@material-ui/core";
import clsx from "clsx";

type AdminMenuProps = {
    show: boolean;
    selected: boolean;
    setShowFab: React.Dispatch<React.SetStateAction<boolean>>;
    style: any;
    activeSubMenuItem: any;
    setActiveSubmenuItem: any;
    setActivePanel: any;
};
const AdminMenu = ({
    show,
    selected,
    setShowFab,
    style,
    activeSubMenuItem,
    setActiveSubmenuItem,
    setActivePanel,
}: AdminMenuProps) => {
    if (!show) return null;

    const items = [
        {
            text: "Rediger katalog",
            disabled: true,
        },
        {
            text: "Rediger gruppeledere",
        },
        {
            text: "Rediger grupper",
        },
        {
            text: "Rediger administratorer",
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
                                activeSubMenuItem === cat.text,
                            [style.hideCategoryButtons]: cat.disabled,
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
