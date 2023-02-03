import { Card, Table } from "@nextui-org/react";
import * as Realm from "realm-web"
import { useEffect , useState} from "react";


export default function Recurring() {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 10 }}>
            <Card css={{ mw: "400px" }}>
                <Card.Body>
                    <CardHeader />
                    <Card.Divider></Card.Divider>
                    <CardTable></CardTable>
                    <Card.Divider></Card.Divider>

                </Card.Body>
            </Card>
        </ div>
    );
}

function CardHeader() {
    return (
        <Card.Header>
            <text>RECURRING EXPENSES</text>
        </Card.Header>
    )
}

function CardTable() {

    const columns = [
        {
            key: "name",
            label: "NAME",
        },
        {
            key: "amt",
            label: "AMOUNT",
        },
    ];

    const [rows, setRows] = useState([]);

    useEffect(async () => {
        const recData = await getRecData("nik")
        console.log("myval", recData[0])
        setRows(recData[0].Recurring_Expenses)
    }, []);

    return (
        <Table
            aria-label="Example table with dynamic content"
            css={{
                height: "auto",
                minWidth: "100%",
            }}
        >
            <Table.Header columns={columns}>
                {(column) => (
                    <Table.Column key={column.key}>{column.label}</Table.Column>
                )}
            </Table.Header>
            <Table.Body items={rows}>
                {(item) => (
                    <Table.Row key={item.key}>
                        {(columnKey) => <Table.Cell>{item[columnKey]}</Table.Cell>}
                    </Table.Row>
                )}
            </Table.Body>
        </Table>
    )
}

async function getRecData(username) {
    const app = new Realm.App({ id: "budzgeter-gogly" });
    const credentials = Realm.Credentials.anonymous();
    try {
        const user = await app.logIn(credentials);
        const allRecData = await user.functions.getRecurring(username);
        console.log("all re data", allRecData)
        return allRecData
    } catch (err) {
        console.error("Failed to log in", err);
    }
}