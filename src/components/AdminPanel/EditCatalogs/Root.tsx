import React, { useState } from "react";
import { Link } from "react-router-dom";

import Container from "@material-ui/core/Container";
import CircularProgress from "@material-ui/core/CircularProgress";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import Card from "@material-ui/core/Card";
import CardContent from "@material-ui/core/CardContent";
import DeleteIcon from "@material-ui/icons/Delete";
import BookmarkIcon from "@material-ui/icons/Bookmark";
import EditIcon from "@material-ui/icons/Edit";
import AddIcon from "@material-ui/icons/Add";
import Typography from "@material-ui/core/Typography";

import commonStyles from "../common.module.css";
import useApiGet from "../useApiGet";
import { compareByCreatedAt } from "../helpers";
import {
    listAllFormDefinitions,
    updateFormDefinitionCreatedAt,
} from "../catalogApi";
import Button from "../../mui/Button";
import Table from "../../mui/Table";
import TableRow from "../../mui/TableRow";
import ActivateCatalogDialog from "./ActivateCatalogDialog";

const Catalog = ({ catalog, deleteCatalog, active, activateCatalog }: any) => {
    const name = catalog.label || "Ikke satt";

    return (
        <>
            <TableRow selected={active}>
                <TableCell>{name}</TableCell>
                <TableCell>
                    {new Date(catalog.updatedAt).toLocaleString("nb-NO")}
                </TableCell>
                <TableCell align="right">
                    <Button
                        disabled={active}
                        endIcon={<BookmarkIcon />}
                        onClick={() => activateCatalog(catalog)}
                    >
                        Bruk katalog
                    </Button>
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

const CatalogTable = ({ catalogs, deleteCatalog, activateCatalog }: any) => {
    return (
        <TableContainer className={commonStyles.tableContainer}>
            <Table stickyHeader>
                <TableHead>
                    <TableRow>
                        <TableCell>Navn</TableCell>
                        <TableCell>Sist oppdatert</TableCell>
                        <TableCell />
                        <TableCell />
                        <TableCell />
                    </TableRow>
                </TableHead>
                <TableBody>
                    {catalogs.map((c: any, ind: number) => (
                        <Catalog
                            key={c.id}
                            catalog={c}
                            deleteCatalog={deleteCatalog}
                            activateCatalog={activateCatalog}
                            active={ind === 0}
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
        cmpFn: compareByCreatedAt,
    });

    const [
        showDeleteCatalogDialog,
        setShowDeleteCatalogDialog,
    ] = useState<boolean>(false);
    const [catalogToDelete, setCatalogToDelete] = useState<any>();
    const deleteCatalog = (catalog: any) => {
        setShowDeleteCatalogDialog(true);
        setCatalogToDelete(catalog);
    };
    const deleteCatalogConfirm = async () => {
        // await removeA(adminToDelete);
        setShowDeleteCatalogDialog(false);
        setDummy((dummy) => dummy + 1);
    };

    const [
        showActivateCatalogDialog,
        setShowActivateCatalogDialog,
    ] = useState<boolean>(false);
    const [catalogToActivate, setCatalogToActivate] = useState<any>();
    const activateCatalog = (catalog: any) => {
        setShowActivateCatalogDialog(true);
        setCatalogToActivate(catalog);
    };
    const activateCatalogConfirm = async () => {
        await updateFormDefinitionCreatedAt(
            catalogToActivate,
            new Date().toISOString()
        );
        setShowActivateCatalogDialog(false);
        setDummy((dummy) => dummy + 1);
    };

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
                        activateCatalog={activateCatalog}
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
            <ActivateCatalogDialog
                open={showActivateCatalogDialog}
                onCancel={() => setShowActivateCatalogDialog(false)}
                onExited={() => setCatalogToActivate(null)}
                onConfirm={activateCatalogConfirm}
            />
        </Container>
    );
};

export default Root;
