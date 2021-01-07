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

export default function Report() {
  const  { id } = useParams();
  let history = useHistory();

  let theoritical = {
    labels: [
      //getquestion
      "1.	تم توضيح أهداف المقرر في بداية الفصل الدراسي  ",
      "2.	تحققت اهداف المقرر في نهاية الفصل الدراسي ",
      "3.	أستعين بالمحاضرة كمصدر أساسي في الإستذكار",
      "4.	المحاضرات والتدريبات العلمية ترتبط بأهداف المقرر",
      "5.	 تم عرض موضوعات المقرر على نحو منطقي سليم",
      "6.	 يتلاءم محتوى المقرر مع الهدف من دراسته",
      "7.	يتناسب كم المحتوى الدارسي للمقرر مع المدة الزمنية لدراسته",
      "8.	المحتوى العلمي للمقرر يتضمن جوانب مفيدة للحياة",
      "9.	تسهم موضوعات المقرر في إعداد الطالب للعمل",
      "10.	توجد مصادر مرجعية متعددة لمحتوى المقرر (الكتاب الجامعي - مراجع - مواقع...الخ",
      "11.	تسهم طرق التدريس في تنمية مهارات الطالب في التعلم الذاتي",
      "12.	طرق التدريس المستخدمة تساعد على إكتساب مهارات التفكير والإبداع",
      "13.	تستخدم وسائل ومعينات سمعية وبصرية ملائمة وفعالة أثناء التدريس",
      "14.	يتم تغطية محتويات المقرر في الوقت المخصص للعملية التعليمية",
      "16.	يستخدم المحاضر المناقشه والحوار مع الطلاب",
      "17.	يدمج المحاضر أمثلة وتطبيقات حيتية مع محتوى المقرر",
      "18.	يتواصل المحاضر مع طلابه علي نحو جيد",
      "19.	يتعامل المحاضر بإحترام مع الطالب",
      "20.	يمكن اللجوء للقاتم بالتدريس خلال الساعات المكتبية",
      "22.	عضو الهيئة المعاونة (معيد – مدرس مساعد) يتعامل معنا بإحترام"
    ],
    datasets: [
      {
        label: "Rate",
        backgroundColor: "rgb(	63, 81, 181)",
        borderColor: "rgb(255, 99, 132)",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    ]
  };
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
      "28.	يلتزم القائمون بتدريس الجزء العملي بإستخدام الإيضاح العلمي من نماذج ومواد فعالة"
    ],
    datasets: [
      {
        label: "Rate",//object subject name
        backgroundColor: "rgb(	63, 81, 181)",
        borderColor: "rgb(255, 99, 132)",
        data: [0, 0, 0, 0, 0, 0, 0, 0, 0]
      }
    ]
  };
  const [practicalData, setPracticalData] = useState<iBarData[]>([]);
  const [theoriticalData, setTheoriticalData] = useState<iBarData>(theoritical);
  const [hasError, setHasError] = useState(false);
  useEffect(() => {
    
    const token = {
      headers: { 
        Authorization: `Bearer `+ localStorage.getItem("AQUA_token")
       }
    }
    axios
      .get(`http://127.0.0.1:8000/api/ApiDoctor/total/${id}`,token)
      .then((response: any) => {
        if(response.data.message === 'not found total yet') {
          setHasError(true);
        }
        if(response.data[0].t_1){
          const tDatasets = {
            ...theoritical.datasets[0],
            data: [
              response.data[0].t_1,
              response.data[0].t_2,
              response.data[0].t_3,
              response.data[0].t_4,
              response.data[0].t_5,
              response.data[0].t_6,
              response.data[0].t_7,
              response.data[0].t_8,
              response.data[0].t_9,
              response.data[0].t_10,
              response.data[0].t_11,
              response.data[0].t_12,
              response.data[0].t_13,
              response.data[0].t_14,
              response.data[0].t_16,
              response.data[0].t_17,
              response.data[0].t_18,
              response.data[0].t_19,
              response.data[0].t_20,
            ],
          };
  
          setTheoriticalData({
            ...theoriticalData,
            datasets: [tDatasets],
          });
        }
      
        if(Array.isArray(response.data[1])) {
          let practicalArr = [];
          for(let i = 0; i < response.data[1].length; i++) {
            const pDatasets = {
              ...practical.datasets[0],
              label: response.data[1][i].assistant_name, //practical
              data: [
                response.data[1][i].t_15,
                response.data[1][i].t_21,
                response.data[1][i].t_22,
                response.data[1][i].t_23,
                response.data[1][i].t_24,
                response.data[1][i].t_25,
                response.data[1][i].t_26,
                response.data[1][i].t_27,
                response.data[1][i].t_28,
              ],
            };
            const data = {
              ...practical,
              datasets: [pDatasets],
            }
            practicalArr.push(data);
          }
          
          setPracticalData(practicalArr);
        }
      })
      .catch(err => {
        if(err.message === 'Request failed with status code 401') {
          localStorage.removeItem('AQUA_token');
          localStorage.removeItem('AQUA_UserType');
          toastr.clear();
          toastr.error(`you're not authorized please login again with the right role`);
          history.push('/login');
        }
        console.log(err.message)
        if(err.message === 'not found total yet') {
          
          toastr.clear();
          toastr.error(`we are sorry to hear that but not found total yet`);
        }
      });
  },[]);

  const options = {
    scales: {
      yAxes: [
        {
          ticks: {
            beginAtZero: true
          }
        }
      ]
    }
  };

  return (
    <div>
     { hasError ? <Alert severity="error">not found total yet</Alert> : <>
      <Bar data={theoriticalData} options={options} width={100} height={50} />
      {
            practicalData.map((pChartData, i) => 
              <Bar key={i} data={pChartData} options={options} width={100} height={50} />
            )
          }

      </>
      }
    </div>
  );
}
