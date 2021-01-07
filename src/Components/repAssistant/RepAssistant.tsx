import React, { useEffect, useState } from "react";
import { Bar } from "react-chartjs-2";
import { useParams, useHistory } from "react-router-dom";
import axios from "axios";
import Alert from '@material-ui/lab/Alert';

interface iBarDataset {
  label: string;
  backgroundColor: string;
  borderColor: string;
  data: number[];
}
interface iBarData {
  labels: string[];
  datasets: iBarDataset[];
}

export default function RepAssistant() {
  const { id } = useParams();
  let history = useHistory();
  let practical = {
    labels: [
      //getquestion
      "15.	يلتزم القائمون بالتدريس بالحضور في المواعيد المعلنة",
      "21.	أرغب بدراسة مقرر دراسي آخر مع نفس الأستاذ",
      "22.	عضو الهيئة المعاونة (معيد – مدرس مساعد) يتعامل معنا بإحترام",
      "23.	عضو هيئه التدريس متمكن من الماده العلميه",
      "24.	عضو هيئه التدريس يقدم العون اللازم للطالب",
      "25.	عضو هيئة التدريس يشجع ويمارس ضغوطا للإتجاه للدروس الخصوصية",
      "26.	تتوافر بالمعامل الإمكانات والتجهيزات اللازمة لتعلم المهارات المهنية والعلمية.",
      "27.	يرتبط محتوي الجزء لعملي من المقرر بالتطبيقات العلميه الاساسيه للجوانب النظريه للمقرر",
      "28.	يلتزم القائمون بتدريس الجزء العملي بإستخدام الإيضاح العلمي من نماذج ومواد فعالة",
    ],
    datasets: [
      {
        label: "rate",
        backgroundColor: "rgb(	63, 81, 181)",
        borderColor: "rgb(255, 99, 132)",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0],
      },
    ],
  };
  const [practicalData, setPracticalData] = useState<iBarData>(practical);
  //   const [theoriticalData, setTheoriticalData] = useState<iBarData>(theoritical);
  const [hasError, setHasError] = useState(false);
  useEffect(() => {
    const token = {
      headers: {
        Authorization: `Bearer ` + localStorage.getItem("AQUA_token"),
      },
    };
    axios
      .get(
        `http://127.0.0.1:8000/api/ApiAssistant/total_practical/${id}`,
        token
      )
      .then((response: any) => {
        if(response.data.message === 'not found total yet') {
          setHasError(true);
        }
        const pDatasets = {
          ...practical.datasets[0],
          data: [
            response.data.t_15,
            response.data.t_21,
            response.data.t_22,
            response.data.t_23,
            response.data.t_24,
            response.data.t_25,
            response.data.t_26,
            response.data.t_27,
            response.data.t_28,
          ],
        };

        setPracticalData({
          ...practicalData,
          datasets: [pDatasets],
        });
      })
      .catch((err) => {
        if (err.message === "Request failed with status code 401") {
          localStorage.removeItem("AQUA_token");
          localStorage.removeItem("AQUA_UserType");
          toastr.clear();
          toastr.error(
            `you're not authorized please login again with the right role`
          );
          history.push("/login");
        }
      });
  }, []);

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true,
          },
        },
      ],
    },
  };

  return (
      <div>
      { hasError ? <Alert severity="error">not found total yet</Alert> : 
      <Bar data={practicalData} options={options} width={100} height={50} />
       }
     </div>
  );
}
