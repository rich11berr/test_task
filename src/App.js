import React, { useEffect, useMemo, useState } from "react";
import axios from "axios";
import Item from "./components/items/Item";
import Search from "./components/UI/Search";
import "./styles/App.scss";
import { getPageArray, getPageCount } from "./utils/page";

function App() {
    const [data, setData] = useState();
    const [searchData, setSearchData] = useState("");
    const [totalPages, setTotalPages] = useState(0);
    const [page, setPage] = useState(1);
    const [sortState, setSortState] = useState("");
    let pagesArray = getPageArray(totalPages);

    async function getData(page) {
        const url = "https://jsonplaceholder.typicode.com/posts";
        const response = await axios.get(url, {
            params: {
                _limit: 10,
                _page: page,
            },
        });
        setData(response.data);
        const totalCount = response.headers["x-total-count"];
        setTotalPages(getPageCount(totalCount));
    }

    const sortPosts = (sortType) => {
        setSortState(sortType);
    };

    useEffect(() => {
        getData(page);
    }, [page]);

    const sortedData = useMemo(() => {
        if (sortState) {
            if (sortState === "id") {
                return [...data].sort((a, b) => b[sortState] - a[sortState]);
            } else {
                return [...data].sort((a, b) =>
                    a[sortState].localeCompare(b[sortState])
                );
            }
        } else return data;
    }, [data, sortState]);

    const searchedData = useMemo(() => {
          return sortedData.filter((post) => post.title.includes(searchData));
    }, [searchData, sortedData]);

    return (
        <div className="App">
            <Search
                value={searchData}
                onChange={(e) => setSearchData(e.target.value)}
            />
            <div className="nav">
                <button className="nav__btn" onClick={() => sortPosts("id")}>
                    ID
                    <svg
                        width="12"
                        height="7"
                        viewBox="0 0 12 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <line
                            x1="0.353553"
                            y1="0.646447"
                            x2="6.18011"
                            y2="6.47301"
                            stroke="#FCFCFC"
                        />
                        <line
                            x1="5.64645"
                            y1="6.30331"
                            x2="11.3033"
                            y2="0.646453"
                            stroke="white"
                        />
                    </svg>
                </button>
                <button className="nav__btn" onClick={() => sortPosts("title")}>
                    Заголовок
                    <svg
                        width="12"
                        height="7"
                        viewBox="0 0 12 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <line
                            x1="0.353553"
                            y1="0.646447"
                            x2="6.18011"
                            y2="6.47301"
                            stroke="#FCFCFC"
                        />
                        <line
                            x1="5.64645"
                            y1="6.30331"
                            x2="11.3033"
                            y2="0.646453"
                            stroke="white"
                        />
                    </svg>
                </button>
                <button className="nav__btn" onClick={() => sortPosts("body")}>
                    Описание
                    <svg
                        width="12"
                        height="7"
                        viewBox="0 0 12 7"
                        fill="none"
                        xmlns="http://www.w3.org/2000/svg"
                    >
                        <line
                            x1="0.353553"
                            y1="0.646447"
                            x2="6.18011"
                            y2="6.47301"
                            stroke="#FCFCFC"
                        />
                        <line
                            x1="5.64645"
                            y1="6.30331"
                            x2="11.3033"
                            y2="0.646453"
                            stroke="white"
                        />
                    </svg>
                </button>
            </div>
            <div className="table">
                {searchedData ? (
                    searchedData.map((item) => {
                        return <Item data={item} key={item.id} />;
                    })
                ) : (
                    <p>Что то пошло не так 0_0</p>
                )}
            </div>
            <div className="pag">
                <button className="pag__btn" onClick={() => setPage(page - 1)}>
                    Назад
                </button>
                <div>
                    {pagesArray.map((p) => (
                        <button
                            key={p}
                            onClick={() => setPage(p)}
                            className={
                                page == p ? "pag__btn-current" : "pag__btn"
                            }
                        >
                            {p}
                        </button>
                    ))}
                </div>
                <button className="pag__btn" onClick={() => setPage(page + 1)}>
                    Вперед
                </button>
            </div>
        </div>
    );
}

export default App;
