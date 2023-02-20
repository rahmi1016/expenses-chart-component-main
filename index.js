const ctx = document.getElementById("myChart");

async function fetchData() {
  const url = "data.json";
  const response = await fetch(url);
  //wait until the request has been completed
  const datapoints = await response.json();
  return datapoints;
}

fetchData().then((datapoints) => {
  let labels = datapoints.map(function (index) {
    return index.day;
  });
  let amount = datapoints.map(function (index) {
    return index.amount;
  });

  const backgroundColor = [];
  const hoverBackgroundColor = [];
  var days = ["sun", "tue", "wed", "thu", "fri", "sat", "mon"];
  var d = new Date();
  let currentDay = days[d.getDay()];
  for (i = 0; i < labels.length; i++) {
    if (labels[i] === currentDay) {
      backgroundColor.push("hsl(186, 34%, 60%)");
      hoverBackgroundColor.push("hsl(186, 47%, 82%)");
    }
    if (labels[i] !== currentDay) {
      backgroundColor.push("hsl(10, 79%, 65%)");
      hoverBackgroundColor.push("hsl(12, 82%, 76%)");
    }
  }
  console.log(backgroundColor);
  console.log(hoverBackgroundColor);

  const titleTooltip = (tooltipItems) => {
    return "";
  };
  const labelTooltip = function (context) {
    let label = context.dataset.label || "";
    if (label) {
      label += ": ";
    }
    if (context.parsed.y !== null) {
      label += new Intl.NumberFormat("en-US", {
        style: "currency",
        currency: "USD",
      }).format(context.parsed.y);
    }
    return label;
  };

  new Chart(ctx, {
    type: "bar",
    data: {
      labels: labels,
      datasets: [
        {
          data: amount,
          borderWidth: 1,
          backgroundColor: backgroundColor,
          hoverBackgroundColor: hoverBackgroundColor,
          borderSkipped: false,
          borderRadius: 6,
        },
      ],
    },

    options: {
      responsive: true,
      maintainAspectRatio: false,
      plugins: {
        legend: { display: false },
        tooltip: {
          yAlign: "bottom",
          xAlign: "center",
          displayColors: false,
          caretSize: 0,
          caretPadding: 5,
          padding: 8,
          bodyFont: {
            size: 16,
            family: "'DM Sans'",
          },
          callbacks: {
            title: titleTooltip,
            label: labelTooltip,
          },
        },
      },

      scales: {
        y: {
          display: false,
        },
        x: {
          grid: {
            display: false,
          },
          ticks: {
            font: {
              size: 16,
              family: "'DM Sans'",
            },
            color: "hsl(28, 10%, 53%)",
          },
          border: {
            display: false,
          },
        },
      },
    },
  });
});
