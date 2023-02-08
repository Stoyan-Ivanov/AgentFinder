<template>
  <div
    class="sticky flex w-full flex-row justify-center rounded-b-xl bg-white shadow-sm"
  >
    <div
      class="container flex flex-row items-center justify-between py-4 px-5 md:px-0"
    >
      <RouterLink
        class="title-font flex items-center font-medium active:scale-95"
        to="/"
      >
        <img src="@/assets/images/logo.svg" alt="AgentFinder logo" />
        <span class="ml-3 text-xl hover:text-primary">AgentFinder</span>
      </RouterLink>

      <RouterLink to="/admin">
        <button
          class="flex items-center rounded-lg border border-solid border-primary py-1 px-5 text-base text-primary transition-colors duration-150 ease-out hover:border-primary hover:bg-primary hover:text-white active:scale-95"
        >
          <span>Admin</span>
          <ArrowNarrowRightIcon class="ml-1 h-4 w-4" />
        </button>
      </RouterLink>
    </div>
  </div>
</template>
