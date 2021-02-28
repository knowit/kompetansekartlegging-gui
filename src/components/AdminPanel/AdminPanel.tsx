import React from "react";
import { EditGroupLeaders } from "./EditGroupLeaders";
import style from "./AdminPanel.module.css"

type AdminPanelProps = {
    activeCategory: string;
};

enum SubmenuCategory {
    MAIN,
    EDIT_GROUP_LEADERS,
    EDIT_GROUPS,
    EDIT_ADMINS,
}

const activeCategoryToSubmenuCategory = (
    activeCategory: string
): SubmenuCategory => {
    switch (activeCategory) {
        case "Rediger gruppeledere":
            return SubmenuCategory.EDIT_GROUP_LEADERS;
        case "Rediger grupper":
            return SubmenuCategory.EDIT_GROUPS;
        case "Rediger administratorer":
            return SubmenuCategory.EDIT_ADMINS;
        default:
            return SubmenuCategory.MAIN;
    }
};

const AdminPanel = ({ activeCategory }: AdminPanelProps) => {
    const category = activeCategoryToSubmenuCategory(activeCategory);

    return (
        <div className={style.container}>
            {(category === SubmenuCategory.MAIN ||
                category === SubmenuCategory.EDIT_GROUP_LEADERS) && (
                <EditGroupLeaders />
            )}
        </div>
    );
};

export { AdminPanel };
