<template>
    <div class="parent">
        <h1>NUFT Admin Panel</h1>
        <div class="buttons" dir="rtl">
            <a href="/NUFTawyNumber1-national" class="button">الجامعات الاهلية</a>
            <a href="/NUFTawyNumber1-private" class="button">الجامعات الخاصة</a>
            <a href="/NUFTawyNumber1-special" class="button">الجامعات ذات طبيعة خاصة</a>
             <a href="/NUFTawyNumber1-International" class="button">الجامعات الدولية</a>
        </div>
    </div>
</template>

<style scoped>
.parent {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    height: 100vh; /* Full viewport height */
    text-align: center;
    margin: 0;
}

.buttons {
    display: flex;
    flex-wrap: wrap;
    justify-content: center;
    gap: 15px;
}

.button {
    background-color: #001d3d; /* Button color */
    color: #fff;
    padding: 15px 30px; /* Increased padding */
    text-decoration: none;
    font-size: 1.25rem; /* Larger font size */
    border-radius: 10px;
    transition: background-color 0.3s ease, transform 0.3s ease;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
}

.button:hover {
    background-color: #003366; /* Darker shade on hover */
    transform: translateY(-2px);
}

@media (max-width: 425px) {
    .buttons {
        flex-direction: column;
        gap: 10px;
    }

    .button {
        width: 100%;
        text-align: center;
        padding: 12px; /* Adjust padding for smaller screens */
        font-size: 1rem; /* Adjust font size for smaller screens */
    }
}
</style>
