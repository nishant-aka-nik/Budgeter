import { Card, Input, Table, Spacer, Button } from "@nextui-org/react";
import { useEffect, useState } from "react";
import * as Realm from "realm-web";


export default function Investment() {
    return (
        <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 10 }}>
            <Card css={{ mw: "400px" }}>
                <Card.Body>
                    <CardHeader />
                    <Card.Divider></Card.Divider>
                    <CardTable></CardTable>
                    <Card.Divider></Card.Divider>
                    <CardFooter></CardFooter>
                </Card.Body>
            </Card>
        </ div>
    );
}

function CardHeader() {
    return (
        <Card.Header>
            <text>INVESTMENTS</text>
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
        console.log("myval", recData[0].Investment)

        let rowData = recData[0].Investment.map((value, index) => {
            index = index + 1
            value["key"] = index
            return value
        })
        setRows(rowData)
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
        const allRecData = await user.functions.getInvestments(username);
        console.log("all re data", allRecData)
        return allRecData
    } catch (err) {
        console.error("Failed to log in", err);
    }
}


function CardFooter() {
    return (
        <Card.Footer>
            <Input size="xs" placeholder="Expense Name" />
            <Spacer y={0.5} />
            <Input size="xs" placeholder="Amount" />
            <Spacer y={0.5} />
            <Button size="xs" aria-label="Add expense">Add Expense</Button>

        </Card.Footer>
    )
}