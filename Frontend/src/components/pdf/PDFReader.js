import React, { useState, useEffect } from "react";
import "../../App.css";
import AllPagesPDFViewer from "./all-pages";

const PDFReader = (props) => {
    const [mod, setMod] = useState("");

    useEffect(() => {
        const getBook = async () => {
            const res = await fetch(
                `http://localhost:8082/api/books/${props.match.params.id}`
            );
            const { file_path } = await res.json();

            const paths = file_path.split(`\\`);
            const path = "./" + paths[paths.length - 1];
            // console.log("path", path);

            try {
                const { default: module } = await import(`${path}`);
                // console.log(module);

                setMod(module);
            } catch (err) {
                console.error(err);
                alert("book not found. using default...");

                const { default: module } = await import(
                    "./1623760688822_Session 4(1).pdf"
                );
                // console.log(module);

                setMod(module);
            }
        };

        getBook();
    }, []);

    return (
        <div className="all-page-container">
            <AllPagesPDFViewer pd={mod} />
        </div>
    );
};

export default PDFReader;
