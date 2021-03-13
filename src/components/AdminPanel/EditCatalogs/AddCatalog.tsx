import React from "react";
import Container from "@material-ui/core/Container";

import commonStyles from "../common.module.css";

const AddCatalog = () => {
    return (
        <Container maxWidth="md" className={commonStyles.container}>
            <h2>Add catalog</h2>
        </Container>
    );
};

export default AddCatalog;
