<script setup lang="ts">
import { computed, h, reactive, ref, } from 'vue'
import { require } from '@/utils/require'
import { ElInput, ElNotification, type FormInstance, type FormRules } from 'element-plus'
import type { LoginDTO, User } from '@/types/user'
import { loginAPI } from '@/apis/user'
import { useUserStore } from '@/stores/userStore'
import router from '@/router'

// 表单对象
const ruleFormRef = ref<FormInstance>()

// 登录表单数据
const loginDTO = reactive<LoginDTO>({
    phone: '',
    pwd: '',
})

// 检查手机号格式
const checkPhone = (rule: any, value: any, callback: any) => {
    if (!value) {
        return callback(new Error('请输入手机号'))
    }
    setTimeout(() => {
        if (!String(value).match(/^1[3-9][0-9]{9}$/)) {
            callback(new Error('请输入正确的手机号'))
        } else {
            callback()
        }
    }, 1000)
}


// 规则数据对象
const rules = reactive<FormRules<LoginDTO>>({
    phone: [
        { validator: checkPhone, trigger: 'blur' }
    ],
    pwd: [
        { required: true, message: '密码不能为空', trigger: 'blur' },
        { min: 6, max: 24, message: '密码长度要求6-14个字符', trigger: 'blur' }
    ],
})

// 提交表单
const submitForm = (formEl: FormInstance | undefined) => {
    if (!formEl) return
    formEl.validate((valid) => {
        if (valid) {
            onLogin(loginDTO)
        } else {

            return false
        }
    })
}


// 用户登录
const onLogin = async (loginDTO: LoginDTO) => {
    const res = await loginAPI(loginDTO)
    // 持久化保存用户信息
    useUserStore().saveUserInfo(res.data)
    // 跳转到首页
    router.push({ path: '/' })
}



const logoUrl = require('../assets/logo_color.png');

</script>


<template>
    <div class="main">

        <div class="board">

            <div class="logo">
                <el-image :src="logoUrl"
                          fit="fill" />
            </div>

            <el-form class="form"
                     ref="ruleFormRef"
                     :model="loginDTO"
                     :rules="rules">
                <el-form-item prop="phone">
                    <el-input v-model="loginDTO.phone"
                              placeholder="请输入手机号">
                        <template #prefix>
                            <el-icon class="el-input__icon">
                                <User />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item prop="pwd">
                    <el-input v-model="loginDTO.pwd"
                              type="password"
                              placeholder="请输入密码">
                        <template #prefix>
                            <el-icon class="el-input__icon">
                                <Lock />
                            </el-icon>
                        </template>
                    </el-input>
                </el-form-item>
                <el-form-item>
                    <el-button type="primary"
                               style="width: 100%; margin: 1rem auto;"
                               @click="submitForm(ruleFormRef)">登录</el-button>
                </el-form-item>
            </el-form>

        </div>

    </div>
</template>


<style scoped lang="scss">
.main {
    width: 100%;
    height: 100%;
}

.board {
    line-height: 95%;
    height: 95%;
    margin: 5rem;
}

.logo {
    width: 200px;
    height: 200px;
    margin: 0 auto;
    background-image: url('@/assets/logo_color.png');
    // background-color: beige;
}

.form {
    max-width: 300px;
    margin: 2rem auto;
}
</style>