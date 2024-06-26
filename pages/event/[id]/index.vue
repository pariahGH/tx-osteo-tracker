<script setup lang="ts">
const isAdmin = isSignedInUserAdmin()

// useRoute allows for the id parameter to be accessed
const route = useRoute()
const { data } = await useFetch(`/api/events/${route.params.id}`)
</script>

<template>
  <h1 v-if="data === null" class="text-red-500 flex items-center text-xl">
    Error: No Data!
  </h1>
  <div v-if="data !== null">
    <h1>
      <b class="text-4xl font-bold font-lexend mr-7 my-5">{{ data.name }}</b>
    </h1>
    <div class="flex flex-wrap items-center mt-5">
      <div>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M17.7549 13.9999C18.0502 14 18.3427 14.0583 18.6155 14.1715C18.8883 14.2846 19.1362 14.4504 19.3449 14.6593C19.5536 14.8682 19.7192 15.1162 19.8321 15.3892C19.945 15.6621 20.003 15.9545 20.0029 16.2499V17.1679C20.0029 17.7409 19.8239 18.2996 19.4909 18.7659C17.9449 20.9299 15.4209 22.0009 12.0009 22.0009C8.57891 22.0009 6.05591 20.9289 4.51391 18.7649C4.18203 18.2989 4.00376 17.741 4.00391 17.1689V16.2489C4.00391 15.6524 4.24085 15.0804 4.66262 14.6586C5.08439 14.2368 5.65643 13.9999 6.25291 13.9999H17.7549ZM11.9999 2.00488C12.6565 2.00488 13.3067 2.13421 13.9133 2.38548C14.52 2.63676 15.0711 3.00506 15.5354 3.46935C15.9997 3.93364 16.368 4.48484 16.6193 5.09147C16.8706 5.69809 16.9999 6.34827 16.9999 7.00488C16.9999 7.66149 16.8706 8.31167 16.6193 8.9183C16.368 9.52493 15.9997 10.0761 15.5354 10.5404C15.0711 11.0047 14.52 11.373 13.9133 11.6243C13.3067 11.8756 12.6565 12.0049 11.9999 12.0049C10.6738 12.0049 9.40205 11.4781 8.46437 10.5404C7.52669 9.60273 6.99991 8.33097 6.99991 7.00488C6.99991 5.6788 7.52669 4.40703 8.46437 3.46935C9.40205 2.53167 10.6738 2.00488 11.9999 2.00488Z"
            fill="black"
          />
        </svg>
      </div>
      <h3 class="mr-20 ml-3">Organizer: {{ data.organizer }}</h3>
    </div>
    <div class="flex flex-wrap items-center mt-5">
      <div>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M9 10H7V12H9V10ZM13 10H11V12H13V10ZM17 10H15V12H17V10ZM19 3H18V1H16V3H8V1H6V3H5C4.46957 3 3.96086 3.21071 3.58579 3.58579C3.21071 3.96086 3 4.46957 3 5V19C3 19.5304 3.21071 20.0391 3.58579 20.4142C3.96086 20.7893 4.46957 21 5 21H19C19.5304 21 20.0391 20.7893 20.4142 20.4142C20.7893 20.0391 21 19.5304 21 19V5C21 4.46957 20.7893 3.96086 20.4142 3.58579C20.0391 3.21071 19.5304 3 19 3ZM19 19H5V8H19V19Z"
            fill="black"
          />
        </svg>
      </div>
      <h3 class="mr-20 ml-3">
        Date and Time:
        {{
          new Date(data.dateAndTime).toLocaleString('en-US', {
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            hour12: true,
          })
        }}
      </h3>
    </div>
    <div class="flex flex-wrap items-center mt-5">
      <svg
        width="16"
        height="20"
        viewBox="0 0 16 20"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M0 20V18H2V15C2 13.9833 2.23767 13.029 2.713 12.137C3.18833 11.245 3.85067 10.5327 4.7 10C3.85 9.46667 3.18767 8.754 2.713 7.862C2.23833 6.97 2.00067 6.016 2 5V2H0V0H16V2H14V5C14 6.01667 13.7623 6.971 13.287 7.863C12.8117 8.755 12.1493 9.46733 11.3 10C12.15 10.5333 12.8127 11.246 13.288 12.138C13.7633 13.03 14.0007 13.984 14 15V18H16V20H0Z"
          fill="black"
        />
      </svg>
      <h3 class="mr-20 ml-3">
        Hour Offered: {{ data.hoursOffered }} Hours Given
      </h3>
    </div>
    <div class="flex flex-wrap items-center mt-5">
      <div>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            d="M18.157 16.8821L16.97 18.0561C16.095 18.9141 14.96 20.0181 13.564 21.3681C13.1444 21.7738 12.5836 22.0006 12 22.0006C11.4163 22.0006 10.8555 21.7738 10.436 21.3681L6.94497 17.9721C6.50497 17.5411 6.13897 17.1781 5.84297 16.8821C4.62534 15.6644 3.79614 14.113 3.46023 12.424C3.12432 10.735 3.29678 8.98435 3.95581 7.39339C4.61484 5.80243 5.73084 4.44261 7.16269 3.48591C8.59453 2.5292 10.2779 2.01855 12 2.01855C13.722 2.01855 15.4054 2.5292 16.8373 3.48591C18.2691 4.44261 19.3851 5.80243 20.0441 7.39339C20.7032 8.98435 20.8756 10.735 20.5397 12.424C20.2038 14.113 19.3746 15.6644 18.157 16.8821ZM14.5 11.0001C14.5 10.3371 14.2366 9.70119 13.7677 9.23235C13.2989 8.7635 12.663 8.50011 12 8.50011C11.3369 8.50011 10.701 8.7635 10.2322 9.23235C9.76336 9.70119 9.49997 10.3371 9.49997 11.0001C9.49997 11.6632 9.76336 12.299 10.2322 12.7679C10.701 13.2367 11.3369 13.5001 12 13.5001C12.663 13.5001 13.2989 13.2367 13.7677 12.7679C14.2366 12.299 14.5 11.6632 14.5 11.0001Z"
            fill="black"
          />
        </svg>
      </div>

      <h3 class="mr-20 ml-3">Location: {{ data.location }}</h3>
    </div>
    <div class="flex flex-wrap items-center mt-5">
      <div>
        <svg
          width="24"
          height="24"
          viewBox="0 0 24 24"
          fill="none"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            fill-rule="evenodd"
            clip-rule="evenodd"
            d="M16.552 22.133C15.112 22.08 11.031 21.516 6.757 17.243C2.484 12.969 1.921 8.88897 1.867 7.44797C1.787 5.25197 3.469 3.11897 5.412 2.28597C5.64598 2.18494 5.9022 2.14647 6.15553 2.17435C6.40886 2.20222 6.65059 2.29548 6.857 2.44497C8.457 3.61097 9.561 5.37497 10.509 6.76197C10.7176 7.0667 10.8068 7.43752 10.7596 7.80377C10.7123 8.17002 10.532 8.5061 10.253 8.74797L8.302 10.197C8.20774 10.265 8.14139 10.365 8.11528 10.4783C8.08916 10.5916 8.10505 10.7105 8.16 10.813C8.602 11.616 9.388 12.812 10.288 13.712C11.189 14.612 12.441 15.45 13.3 15.942C13.4077 16.0024 13.5345 16.0193 13.6543 15.9892C13.774 15.9591 13.8777 15.8842 13.944 15.78L15.214 13.847C15.4475 13.5368 15.7919 13.329 16.1752 13.2672C16.5584 13.2053 16.9508 13.2941 17.27 13.515C18.677 14.489 20.319 15.574 21.521 17.113C21.6826 17.3209 21.7854 17.5684 21.8187 17.8296C21.8519 18.0908 21.8144 18.3562 21.71 18.598C20.873 20.551 18.755 22.214 16.552 22.133Z"
            fill="black"
          />
        </svg>
      </div>
      <h3 class="mr-20 ml-3">Phone: {{ data.phoneNumber }}</h3>
    </div>
  </div>
  <div v-if="isAdmin">
    <NuxtLink
      :to="`/event/${route.params.id}/volunteers`"
      class="text-green-500"
    >
      Click here to see volunteer list
    </NuxtLink>
  </div>
  <NuxtLink to="/" class="underline">Home</NuxtLink>
</template>
