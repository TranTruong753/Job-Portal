import { defineStore } from 'pinia'
import axios from 'axios'
import { getCookie ,setCookie, deleteCookie } from '../assets/js/cookieUtils.js'
import Swal from 'sweetalert2';
import { jwtDecode } from 'jwt-decode';

   


export const useSkillStore = defineStore('skill', {
    state: () => ({
        list: [],
    }),
    actions: {
        async getSkill(){
            const url = '/api/skill';
            const response = await axios.get(url);
            this.list = response.data;
     
            // console.log( "list skill", this.list);
        },

        delete(){
            this.state();
        }
    },
    persist: {
        enabled: true, // Bật lưu trữ
        strategies: [
          {
            key: 'skill', // Tên khóa lưu trữ
            storage: localStorage, // Hoặc sessionStorage
          },
        ],
      },
})