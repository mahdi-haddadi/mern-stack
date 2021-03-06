import axios from "axios";
import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { Link } from "react-router-dom";
import { ApiAction } from "../redux/actions/ApiAction";

const Article = ({ article }) => {
  const { data } = useSelector((state) => state.api);
  const dispatch = useDispatch();

  const handleDeleteArticle = async (id) => {
    try {
      await axios
        .delete(`http://localhost:8000/${id}`)
        .then((res) => {
          const filterData = data.filter((i) => i._id !== id);
          dispatch(ApiAction(filterData));
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log("error : ", err);
    }
  };

  return (
    <div className="card my-3 mx-auto" style={{ width: "32rem" }}>
      <div className="card-header bg-dark text-light">{article.title}</div>
      <div className="card-body">
        <p className="card-text my-4">{article.content}</p>
        <button
          className="btn btn-danger mx-2"
          onClick={() => handleDeleteArticle(article._id)}
        >
          Delete
        </button>
        <Link to={`/update-article/${article._id}`} className="btn btn-warning">
          Update
        </Link>
      </div>
    </div>
  );
};

export default Article;
