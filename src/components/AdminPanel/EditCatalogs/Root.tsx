import React, { useState } from "react";
import { Link } from "react-router-dom";

import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import DeleteIcon from "@material-ui/icons/Delete";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";

import commonStyles from "../common.module.css";
import useApiGet from "../useApiGet";
import { listAllFormDefinitions } from "../catalogApi";
import Button from "../../mui/Button";
import Table from "../../mui/Table";

const Catalog = ({ catalog, deleteCatalog }: any) => {
    const name = catalog.label || "Ikke satt";

    return (
        <>
            <TableRow>
                <TableCell>{name}</TableCell>
                <TableCell>
                    {new Date(catalog.updatedAt).toLocaleString("nb-NO")}
                </TableCell>
                <TableCell align="right">
                    <Link
                        to={{
                            pathname: `/edit/${catalog.id}`,
                            search: `?label=${name}`,
                        }}
                    >
                        <Button endIcon={<EditIcon />}>Endre katalog</Button>
                    </Link>
                </TableCell>
                <TableCell align="right">
                    <Button
                        endIcon={<DeleteIcon />}
                        onClick={() => deleteCatalog(catalog)}
                    >
                        Fjern katalog
                    </Button>
                </TableCell>
            </TableRow>
        </>
    );
};

const CatalogTable = ({ catalogs, deleteCatalog }: any) => {
    return (
        <TableContainer className={commonStyles.tableContainer}>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell>Navn</TableCell>
                        <TableCell>Sist oppdatert</TableCell>
                        <TableCell />
                        <TableCell />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {catalogs.map((c: any) => (
                        <Catalog
                            key={c.id}
                            catalog={c}
                            deleteCatalog={deleteCatalog}
                        />
                    ))}
                </TableBody>
            </Table>
        </TableContainer>
    );
};

const Root = () => {
    const [dummy, setDummy] = useState(0);
    const { result: catalogs, error, loading } = useApiGet({
        getFn: listAllFormDefinitions,
        refreshCounter: dummy,
    });
    const [
        showDeleteCatalogDialog,
        setShowDeleteCatalogDialog,
    ] = useState<boolean>(false);
    const [catalogToDelete, setCatalogToDelete] = useState<any>();

    const deleteCatalog = (user: any) => {
        setShowDeleteCatalogDialog(true);
        setCatalogToDelete(user);
    };
    const deleteCatalogConfirm = async () => {
        // await removeA(adminToDelete);
        setShowDeleteCatalogDialog(false);
        setDummy((dummy) => dummy + 1);
    };
    const clearSelectedCatalog = () => setCatalogToDelete(null);

    // <DeleteUserFromGroupDialog
    //     open={showDeleteUserFromGroupDialog}
    //     onCancel={() => setShowDeleteUserFromGroupDialog(false)}
    //     onExited={clearSelectedAdmin}
    //     onConfirm={deleteAdminConfirm}
    //     user={adminToDelete}
    //     roleName="administrator"
    // />

    return (
        <Container maxWidth="md" className={commonStyles.container}>
            {error && <p>An error occured: {error}</p>}
            {loading && <CircularProgress />}
            {!error && !loading && catalogs && (
                <>
                    <Card style={{ marginBottom: "24px" }} variant="outlined">
                        <CardContent>
                            <Typography color="textSecondary" gutterBottom>
                                Rediger kataloger
                            </Typography>
                            På denne siden kan du lage nye kataloger, endre på
                            eksisterende kataloger, kategorier og spørsmål og
                            fjerne kataloger.
                        </CardContent>
                    </Card>
                    <CatalogTable
                        catalogs={catalogs}
                        deleteCatalog={deleteCatalog}
                    />
                    <Link to="/add">
                        <Button
                            variant="contained"
                            color="primary"
                            startIcon={<AddIcon />}
                            style={{ marginTop: "24px" }}
                        >
                            Legg til katalog
                        </Button>
                    </Link>
                </>
            )}
        </Container>
    );
};

export default Root;
