<!DOCTYPE html>
<html>
<head>
    <title>Chart.js Example</title>
    <script src="https://cdn.jsdelivr.net/npm/chart.js"></script>
</head>
<body>

    <div style="width: 600px; margin: auto;">
        <canvas id="myChart"></canvas>
    </div>

<script>
    const ctx = document.getElementById('myChart').getContext('2d');

    const myChart = new Chart(ctx, {
        type: 'bar',
        data: {
            labels: {!! json_encode(['January', 'February', 'March', 'April', 'May']) !!},
            datasets: [{
                label: 'Users per Month',
                data: {!! json_encode([10, 25, 15, 30, 20]) !!},
                backgroundColor: 'rgba(54, 162, 235, 0.5)',
                borderColor: 'rgba(54, 162, 235, 1)',
                borderWidth: 1
            }]
        },
        options: {
            scales: {
                y: {
                    beginAtZero: true
                }
            }
        }
    });
</script>


</body>
</html>
