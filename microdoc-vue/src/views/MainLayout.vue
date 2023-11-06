<script lang="ts" setup>
import { onMounted, ref } from 'vue'
import {
    Menu as IconMenu,
    PieChart,
    Document,
    User as IconUser,
    Expand,
    Fold,
} from '@element-plus/icons-vue'
import { useUserStore } from '@/stores/userStore';
import type { User } from '@/types/user';
import router from '@/router';


const title = ref("后台系统");

const isCollapse = ref(true);
const currentTab = ref('1');

const userStore = useUserStore()

const handleOpen = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
const handleClose = (key: string, keyPath: string[]) => {
    console.log(key, keyPath)
}
const handleSelect = (index: string, indexPath: string) => {
    console.log(index)
    currentTab.value = index
}

// 获取用户信息
const userInfo = ref({} as User)

onMounted(() => {
    userInfo.value = userStore.userInfo
    // 跳转到登录页
    if (!userInfo.value.id) {
        router.replace({ path: '/login' })
    }
})

// 登出
const logout = () => {
    userStore.clearUserInfo()
    router.replace({ path: '/login' });
}

</script>

<template>
    <el-container>
        <!-- 侧边栏 -->
        <el-aside>
            <el-menu active-text-color="#ffd04b"
                     :collapse="isCollapse"
                     background-color="#222"
                     class="menu"
                     :default-active="$route.path.substring(0, $route.path.indexOf('/', 1)) || '/'"
                     text-color="#fff"
                     router
                     @open="handleOpen"
                     @close="handleClose"
                     @select="handleSelect">

                <!-- 报告管理tab -->
                <el-menu-item index="/">
                    <el-icon>
                        <Document />
                    </el-icon>
                    <span>报告管理</span>
                </el-menu-item>
                <!-- 详细报告tab -->
                <el-menu-item v-if="$route.path.startsWith('/chart-show')"
                              index="/chart-show">
                    <el-icon>
                        <PieChart />
                    </el-icon>
                    <span>详细报告</span>
                </el-menu-item>
                <!-- 用户管理tab -->
                <el-menu-item v-if="userInfo.isAdmin"
                              index="/users">
                    <el-icon>
                        <IconUser />
                    </el-icon>
                    <span>用户管理</span>
                </el-menu-item>
            </el-menu>
        </el-aside>
        <el-container>
            <!-- 顶栏 -->
            <el-header class="header">
                <span class="menu-btn">
                    <el-button text
                               :icon="isCollapse ? Expand : Fold"
                               @click="isCollapse = !isCollapse">

                    </el-button>
                </span>
                <span class="title">{{ title }}</span>

                <!-- 登出键 -->
                <span class="host">
                    <el-icon>
                        <User />
                    </el-icon>
                    {{ userInfo.name }}
                    <el-link :underline="false"
                             type="primary"
                             style="margin-left: 1rem;"
                             @click="logout">
                        登出
                    </el-link>
                </span>


            </el-header>
            <el-scrollbar class="main">
                <router-view />
            </el-scrollbar>
        </el-container>
    </el-container>
</template>

<style scoped lang="scss">
.el-aside {
    width: min-content;
    height: 100vh;

}

.main {
    width: 100%;
    max-height: 700px;
    padding-bottom: 2rem;
}

.menu {
    // width: 100%;
    height: 100%;
    z-index: 9;
}

.menu:not(.el-menu--collapse) {
    width: 200px;
}


.header {
    height: 3rem;
    line-height: 3rem;
    padding-top: 0.2rem;
    box-shadow: 5px 2px #eee;
    justify-content: center;
    flex-wrap: nowrap;
    overflow: hidden;
    min-width: 100%;
    z-index: 9;

    .menu-btn {
        color: #666;

        button {
            font-size: 1.5rem;
            border: none;
            margin-bottom: 0.5rem;
            padding: 0;
        }
    }

    .title {
        font-size: 1.2rem;
        // font-weight: bold;
        color: #666;
        margin-left: 0.6rem;
    }
}

.host {
    float: right;
    display: flex;
    margin-top: 0.5rem;
    margin-right: 1rem;
    justify-content: center;
    align-items: center;
    height: 2rem;
    color: #666;
}
</style>
